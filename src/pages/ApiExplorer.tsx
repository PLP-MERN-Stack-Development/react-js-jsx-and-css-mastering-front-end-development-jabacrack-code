import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function ApiExplorer() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchQuery, posts]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <Loader2 className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-spin mb-4" />
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading posts...</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Fetching data from JSONPlaceholder API
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <Card className="py-12 bg-red-50 dark:bg-red-900">
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-xl font-semibold text-red-600 dark:text-red-400 text-center mb-2">
            Error Loading Posts
          </p>
          <p className="text-sm text-red-600 dark:text-red-400 text-center mb-6">
            {error}
          </p>
          <div className="flex justify-center">
            <Button onClick={fetchPosts} variant="primary">
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
          API Explorer
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Discover posts from JSONPlaceholder API
        </p>
      </div>

      <Card className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts by title or content..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
          />
        </div>
      </Card>

      <div className="flex items-center justify-between mb-6">
        <div className="text-sm md:text-base text-gray-600 dark:text-gray-300">
          Showing <span className="font-bold">{currentPosts.length}</span> of{' '}
          <span className="font-bold">{filteredPosts.length}</span> posts
        </div>
        {filteredPosts.length > 0 && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No posts found matching your search.
          </p>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentPosts.map((post, idx) => (
              <Card
                key={post.id}
                hover
                className="flex flex-col h-full animate-slide-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    #{post.id}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    User {post.userId}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 flex-1">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-4 flex-1 mb-4">
                  {post.body}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>Post ID: {post.id}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer">
                    Read more
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 flex-wrap">
              <Button
                variant="secondary"
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                size="sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? 'primary' : 'secondary'}
                      onClick={() => paginate(pageNumber)}
                      size="sm"
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="secondary"
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                size="sm"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
