import React, { useState, useRef, useEffect } from 'react';
import { Camera, CheckCircle, XCircle, Scan } from 'lucide-react';
import jsQR from 'jsqr';
import { supabase } from '../lib/supabase';

export const QRScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    registration?: any;
  } | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startScanning = async () => {
    try {
      setCameraError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setScanning(true);
        setResult(null);
        
        videoRef.current.onloadedmetadata = () => {
          scanFrame();
        };
      }
    } catch (error) {
      console.error('Camera access error:', error);
      let errorMessage = 'Unable to access camera. ';
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError' || error.message.includes('Permission dismissed')) {
          errorMessage += 'Camera permission was denied. Please allow camera access and try again.';
        } else if (error.name === 'NotFoundError') {
          errorMessage += 'No camera found on this device.';
        } else if (error.name === 'NotSupportedError') {
          errorMessage += 'Camera is not supported on this device.';
        } else {
          errorMessage += 'Please check your camera permissions and try again.';
        }
      }
      
      setCameraError(errorMessage);
    }
  };

  const stopScanning = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setScanning(false);
  };

  const scanFrame = () => {
    if (!scanning || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
      if (imageData) {
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          handleQRDetected(code.data);
          return;
        }
      }
    }

    requestAnimationFrame(scanFrame);
  };

  const handleQRDetected = async (qrData: string) => {
    stopScanning();
    
    try {
      const data = JSON.parse(qrData);
      const { registrationId, eventId } = data;

      // Check if registration exists
      const { data: registration, error: regError } = await supabase
        .from('registrations')
        .select('*, events(*)')
        .eq('registration_id', registrationId)
        .eq('event_id', eventId)
        .single();

      if (regError || !registration) {
        setResult({
          success: false,
          message: 'Invalid QR code or registration not found',
        });
        return;
      }

      // Check if already attended
      const { data: existingAttendance } = await supabase
        .from('attendance')
        .select('*')
        .eq('registration_id', registrationId)
        .single();

      if (existingAttendance) {
        setResult({
          success: false,
          message: 'Attendance already marked for this registration',
          registration,
        });
        return;
      }

      // Mark attendance
      const { error: attendanceError } = await supabase
        .from('attendance')
        .insert([
          {
            registration_id: registrationId,
            attended_at: new Date().toISOString(),
          },
        ]);

      if (attendanceError) {
        throw attendanceError;
      }

      setResult({
        success: true,
        message: 'Attendance marked successfully!',
        registration,
      });
    } catch (error) {
      console.error('QR scan error:', error);
      setResult({
        success: false,
        message: 'Failed to process QR code',
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Scan className="w-7 h-7 mr-3" />
            QR Code Scanner
          </h2>
          <p className="text-green-100 mt-1">Scan participant QR codes to mark attendance</p>
        </div>
        
        <div className="p-8">
          {cameraError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-red-800 font-medium mb-1">Camera Access Error</h4>
                  <p className="text-red-700 text-sm mb-3">{cameraError}</p>
                  <div className="text-xs text-red-600">
                    <p className="mb-1"><strong>To fix this:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Click the camera icon in your browser's address bar</li>
                      <li>Select "Allow" for camera access</li>
                      <li>Refresh the page and try again</li>
                    </ul>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setCameraError(null)}
                className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          )}
          
          {!scanning && !result && (
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Ready to Scan
              </h3>
              <p className="text-gray-600 mb-8">
                Click the button below to start scanning QR codes for attendance
              </p>
              <button
                onClick={startScanning}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-8 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium text-lg flex items-center mx-auto"
              >
                <Camera className="w-5 h-5 mr-2" />
                Start Scanning
              </button>
            </div>
          )}
          
          {scanning && (
            <div className="space-y-6">
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full rounded-lg shadow-sm"
                />
                <canvas ref={canvasRef} className="hidden" />
                <div className="absolute inset-0 border-2 border-green-500 rounded-lg pointer-events-none">
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-green-500"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-green-500"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-green-500"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-green-500"></div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 mb-4">Position the QR code within the frame</p>
                <button
                  onClick={stopScanning}
                  className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Stop Scanning
                </button>
              </div>
            </div>
          )}
          
          {result && (
            <div className="text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                result.success 
                  ? 'bg-green-100' 
                  : 'bg-red-100'
              }`}>
                {result.success ? (
                  <CheckCircle className="w-10 h-10 text-green-600" />
                ) : (
                  <XCircle className="w-10 h-10 text-red-600" />
                )}
              </div>
              
              <h3 className={`text-xl font-semibold mb-4 ${
                result.success ? 'text-green-900' : 'text-red-900'
              }`}>
                {result.success ? 'Success!' : 'Error'}
              </h3>
              
              <p className="text-gray-600 mb-6">{result.message}</p>
              
              {result.registration && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <h4 className="font-semibold text-gray-900 mb-2">Registration Details:</h4>
                  <p className="text-sm text-gray-600">
                    <strong>Name:</strong> {result.registration.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {result.registration.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Event:</strong> {result.registration.events?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Registration ID:</strong> {result.registration.registration_id}
                  </p>
                </div>
              )}
              
              <button
                onClick={() => {
                  setResult(null);
                }}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-8 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-medium"
              >
                Scan Another Code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};