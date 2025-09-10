import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterToolbar from './components/FilterToolbar';
import QuickStats from './components/QuickStats';
import BlogPostGrid from './components/BlogPostGrid';
import LoadMoreButton from './components/LoadMoreButton';

const BlogPostList = () => {
  // Mock user data
  const [user] = useState({
    id: 1,
  name: "Fill Details",
  email: "Fill Details",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  });

  // State management
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const POSTS_PER_PAGE = 9;

  // Mock blog posts data
  const mockPosts = [
    {
      id: 1,
      title: "The Future of Web Development: Trends to Watch in 2025",
      excerpt: "Explore the cutting-edge technologies and methodologies that will shape web development in the coming year. From AI integration to advanced frameworks, discover what's next.",
      content: `The landscape of web development continues to evolve at a rapid pace. As we look toward 2025, several key trends are emerging that will fundamentally change how we build and interact with web applications.\n\nArtificial Intelligence integration is becoming more sophisticated, with AI-powered code generation and automated testing becoming mainstream tools for developers.`,
      featuredImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
      category: "technology",
      author: {
        id: 1,
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2025-01-05T10:30:00Z",
      likes: 124,
      comments: 18,
      views: 2847,
      readTime: 8,
      isLiked: false,
      isNew: true
    },
    {
      id: 2,
      title: "Mastering React Hooks: Advanced Patterns and Best Practices",
      excerpt: "Deep dive into advanced React Hooks patterns that will elevate your component architecture and state management strategies.",
      content: `React Hooks have revolutionized how we write React components, but mastering their advanced patterns can significantly improve your application's performance and maintainability.\n\nCustom hooks are powerful tools for encapsulating complex logic and sharing it across components.`,
      featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      category: "technology",
      author: {
        id: 2,
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2025-01-03T14:15:00Z",
      likes: 89,
      comments: 12,
      views: 1923,
      readTime: 6,
      isLiked: true,
      isNew: false
    },
    {
      id: 3,
      title: "Design Systems That Scale: Building Consistent UI Components",
      excerpt: "Learn how to create and maintain design systems that grow with your organization while ensuring consistency across all touchpoints.",
      content: `A well-designed system is the backbone of any successful digital product. It ensures consistency, improves efficiency, and creates a cohesive user experience across all platforms.\n\nBuilding scalable design systems requires careful planning and consideration of future needs.`,
      featuredImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=400&fit=crop",
      category: "design",
      author: {
        id: 3,
        name: "Emily Davis",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2025-01-02T09:45:00Z",
      likes: 156,
      comments: 24,
      views: 3421,
      readTime: 10,
      isLiked: false,
      isNew: false
    },
    {
      id: 4,
      title: "The Psychology of User Experience: Understanding User Behavior",
      excerpt: "Discover how psychological principles can inform better UX decisions and create more intuitive digital experiences.",
      content: `Understanding user psychology is crucial for creating effective user experiences. By applying psychological principles to design, we can create interfaces that feel natural and intuitive.\n\nCognitive load theory helps us understand how users process information and make decisions.`,
      featuredImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      category: "design",
      author: {
        id: 4,
        name: "David Wilson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-12-30T16:20:00Z",
      likes: 203,
      comments: 31,
      views: 4156,
      readTime: 12,
      isLiked: true,
      isNew: false
    },
    {
      id: 5,
      title: "Building Sustainable Business Models in the Digital Age",
      excerpt: "Explore innovative approaches to creating lasting business value while maintaining ethical and sustainable practices.",
      content: `The digital transformation has opened new opportunities for businesses to create value while maintaining sustainable practices. Companies that embrace both innovation and responsibility are positioning themselves for long-term success.\n\nSustainable business models focus on creating value for all stakeholders.`,
      featuredImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
      category: "business",
      author: {
        id: 5,
        name: "Lisa Anderson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-12-28T11:30:00Z",
      likes: 78,
      comments: 15,
      views: 1876,
      readTime: 7,
      isLiked: false,
      isNew: false
    },
    {
      id: 6,
      title: "Remote Work Revolution: Tools and Strategies for Success",
      excerpt: "Navigate the challenges and opportunities of remote work with proven strategies and cutting-edge collaboration tools.",
      content: `The remote work revolution has fundamentally changed how we approach productivity and collaboration. Success in this new environment requires the right combination of tools, processes, and mindset.\n\nEffective remote work strategies focus on communication, accountability, and work-life balance.`,
      featuredImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop",
      category: "business",
      author: {
        id: 6,
        name: "James Brown",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-12-25T13:45:00Z",
      likes: 142,
      comments: 28,
      views: 2934,
      readTime: 9,
      isLiked: false,
      isNew: false
    },
    {
      id: 7,
      title: "Mindful Living: Finding Balance in a Digital World",
      excerpt: "Discover practical approaches to maintaining mental wellness and authentic connections in our increasingly connected society.",
      content: `In our hyperconnected world, finding balance between digital engagement and mindful living has become essential for mental health and overall well-being.\n\nMindful living practices help us create boundaries and maintain authentic relationships despite digital distractions.`,
      featuredImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
      category: "lifestyle",
      author: {
        id: 7,
        name: "Maria Garcia",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-12-22T08:15:00Z",
      likes: 267,
      comments: 42,
      views: 5123,
      readTime: 11,
      isLiked: true,
      isNew: false
    },
    {
      id: 8,
      title: "Sustainable Travel: Exploring the World Responsibly",
      excerpt: "Learn how to satisfy your wanderlust while minimizing environmental impact and supporting local communities.",
      content: `Sustainable travel is about making conscious choices that benefit both travelers and destinations. By adopting responsible travel practices, we can explore the world while preserving it for future generations.\n\nResponsible tourism focuses on environmental conservation and community support.`,
      featuredImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop",
      category: "travel",
      author: {
        id: 8,
        name: "Robert Taylor",
        avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-12-20T15:30:00Z",
      likes: 189,
      comments: 33,
      views: 3678,
      readTime: 8,
      isLiked: false,
      isNew: false
    },
    {
      id: 9,
      title: "The Art of Minimalist Cooking: Maximum Flavor, Minimal Effort",
      excerpt: "Master the principles of minimalist cooking to create delicious, nutritious meals with simple ingredients and techniques.",
      content: `Minimalist cooking is about maximizing flavor while minimizing complexity. By focusing on quality ingredients and simple techniques, you can create memorable meals without stress.\n\nThe key to minimalist cooking lies in understanding how to enhance natural flavors rather than masking them.`,
      featuredImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop",
      category: "food",
      author: {
        id: 3,
        name: "Emily Davis",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-12-18T12:00:00Z",
      likes: 95,
      comments: 19,
      views: 2156,
      readTime: 6,
      isLiked: false,
      isNew: false
    },
    {
      id: 10,
      title: "Mental Health in the Workplace: Creating Supportive Environments",
      excerpt: "Explore strategies for fostering mental wellness in professional settings and building resilient, supportive teams.",
      content: `Mental health in the workplace has become a critical concern for organizations worldwide. Creating supportive environments requires intentional effort and systematic approaches to employee wellbeing.\n\nSupportive workplace cultures prioritize open communication and mental health resources.`,
      featuredImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop",
      category: "health",
      author: {
        id: 5,
        name: "Lisa Anderson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-12-15T10:45:00Z",
      likes: 234,
      comments: 47,
      views: 4892,
      readTime: 13,
      isLiked: true,
      isNew: false
    },
    {
      id: 11,
      title: "The Future of Online Education: Personalized Learning Experiences",
      excerpt: "Discover how technology is transforming education through personalized learning paths and adaptive assessment methods.",
      content: `Online education is evolving beyond traditional models to offer personalized learning experiences that adapt to individual needs and learning styles.\n\nPersonalized learning leverages AI and data analytics to create customized educational journeys for each student.`,
      featuredImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
      category: "education",
      author: {
        id: 2,
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-12-12T14:20:00Z",
      likes: 167,
      comments: 29,
      views: 3245,
      readTime: 9,
      isLiked: false,
      isNew: false
    },
    {
      id: 12,
      title: "Cryptocurrency and the Future of Finance",
      excerpt: "Analyze the impact of digital currencies on traditional financial systems and explore emerging blockchain technologies.",
      content: `Cryptocurrency continues to reshape the financial landscape, offering new possibilities for transactions, investments, and financial inclusion.\n\nBlockchain technology provides the foundation for decentralized financial systems that operate independently of traditional banking.`,
      featuredImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
      category: "technology",
      author: {
        id: 6,
        name: "James Brown",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-12-10T09:30:00Z",
      likes: 298,
      comments: 56,
      views: 6234,
      readTime: 15,
      isLiked: true,
      isNew: false
    }
  ];

  // Mock stats data
  const mockStats = {
    totalPosts: 127,
    totalAuthors: 8,
    totalCategories: 8,
    postsThisMonth: 12
  };

  // Initialize data
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(mockPosts);
      setLoading(false);
    };

    loadInitialData();
  }, []);

  // Filter and sort posts
  useEffect(() => {
    let filtered = [...posts];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(post =>
        post?.title?.toLowerCase()?.includes(query) ||
        post?.excerpt?.toLowerCase()?.includes(query) ||
        post?.author?.name?.toLowerCase()?.includes(query) ||
        post?.category?.toLowerCase()?.includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered?.filter(post => post?.category === selectedCategory);
    }

    // Apply author filter
    if (selectedAuthor && selectedAuthor !== 'all') {
      filtered = filtered?.filter(post => 
        post?.author?.name?.toLowerCase()?.replace(' ', '-') === selectedAuthor
      );
    }

    // Apply date range filter
    if (dateRange?.start || dateRange?.end) {
      filtered = filtered?.filter(post => {
        const postDate = new Date(post.publishedAt);
        const startDate = dateRange?.start ? new Date(dateRange.start) : null;
        const endDate = dateRange?.end ? new Date(dateRange.end) : null;

        if (startDate && postDate < startDate) return false;
        if (endDate && postDate > endDate) return false;
        return true;
      });
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        case 'oldest':
          return new Date(a.publishedAt) - new Date(b.publishedAt);
        case 'most-liked':
          return b?.likes - a?.likes;
        case 'most-commented':
          return b?.comments - a?.comments;
        case 'most-viewed':
          return b?.views - a?.views;
        case 'alphabetical':
          return a?.title?.localeCompare(b?.title);
        default:
          return 0;
      }
    });

    setFilteredPosts(filtered);
    setCurrentPage(1);
    setHasMore(filtered?.length > POSTS_PER_PAGE);
  }, [posts, searchQuery, selectedCategory, selectedAuthor, dateRange, sortBy]);

  // Get paginated posts
  const getPaginatedPosts = useCallback(() => {
    const startIndex = 0;
    const endIndex = currentPage * POSTS_PER_PAGE;
    return filteredPosts?.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage]);

  // Load more posts
  const handleLoadMore = async () => {
    setLoadingMore(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const nextPage = currentPage + 1;
    const totalPossible = Math.ceil(filteredPosts?.length / POSTS_PER_PAGE);
    
    setCurrentPage(nextPage);
    setHasMore(nextPage < totalPossible);
    setLoadingMore(false);
  };

  // Handle like functionality
  const handleLike = async (postId, isLiked) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setPosts(prevPosts =>
      prevPosts?.map(post =>
        post?.id === postId
          ? {
              ...post,
              isLiked,
              likes: isLiked ? post?.likes + 1 : post?.likes - 1
            }
          : post
      )
    );
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedAuthor('all');
    setDateRange({ start: '', end: '' });
    setSortBy('newest');
  };

  // Handle auth actions
  const handleAuthAction = (action) => {
    if (action === 'logout') {
      // Handle logout logic
      console.log('User logged out');
    }
  };

  // Check if mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const displayedPosts = getPaginatedPosts();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog Posts - BlogFlow</title>
        <meta name="description" content="Discover and explore our collection of insightful blog posts covering technology, design, business, lifestyle, and more." />
        <meta name="keywords" content="blog, articles, technology, design, business, lifestyle, travel, food, health, education" />
      </Helmet>
      <Header user={user} onAuthAction={handleAuthAction} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
              Discover Amazing Content
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore our curated collection of articles covering the latest trends in technology, design, business, and lifestyle.
            </p>
          </div>

          {/* Quick Stats */}
          <QuickStats stats={mockStats} />

          {/* Filter Toolbar */}
          <FilterToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedAuthor={selectedAuthor}
            onAuthorChange={setSelectedAuthor}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={filteredPosts?.length}
            onClearFilters={handleClearFilters}
            isMobile={isMobile}
          />

          {/* Blog Posts Grid */}
          <BlogPostGrid
            posts={displayedPosts}
            onLike={handleLike}
            loading={loading}
          />

          {/* Load More Button */}
          {!loading && displayedPosts?.length > 0 && (
            <LoadMoreButton
              onLoadMore={handleLoadMore}
              loading={loadingMore}
              hasMore={hasMore}
              totalLoaded={displayedPosts?.length}
              totalAvailable={filteredPosts?.length}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default BlogPostList;