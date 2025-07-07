import React, { useState } from 'react';
import { MessageSquare, Plus, Reply, ThumbsUp, Clock, Tag, Search } from 'lucide-react';

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: 'student' | 'instructor';
  courseName: string;
  tags: string[];
  replies: DiscussionReply[];
  likes: number;
  createdAt: string;
  lastActivity: string;
}

interface DiscussionReply {
  id: string;
  content: string;
  author: string;
  authorRole: 'student' | 'instructor';
  createdAt: string;
  likes: number;
}

const StudentDiscussions: React.FC = () => {
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const discussions: Discussion[] = [
    {
      id: '1',
      title: 'How to handle state in functional components?',
      content: 'I\'m having trouble understanding when to use useState vs useReducer. Can someone explain the differences and when to use each?',
      author: 'Alice Johnson',
      authorRole: 'student',
      courseName: 'React Fundamentals',
      tags: ['react', 'hooks', 'state'],
      likes: 12,
      createdAt: '2024-01-15',
      lastActivity: '2024-01-16',
      replies: [
        {
          id: 'r1',
          content: 'Great question! useState is perfect for simple state management, while useReducer is better for complex state logic. Think of useReducer when you have multiple state values that depend on each other.',
          author: 'Jane Smith',
          authorRole: 'instructor',
          createdAt: '2024-01-15',
          likes: 8
        },
        {
          id: 'r2',
          content: 'Thanks for the explanation! That makes it much clearer. I\'ll stick with useState for now.',
          author: 'Alice Johnson',
          authorRole: 'student',
          createdAt: '2024-01-16',
          likes: 3
        }
      ]
    },
    {
      id: '2',
      title: 'Best practices for async/await error handling',
      content: 'What\'s the recommended way to handle errors when using async/await? Should I use try/catch blocks everywhere?',
      author: 'Bob Smith',
      authorRole: 'student',
      courseName: 'Advanced JavaScript',
      tags: ['javascript', 'async', 'error-handling'],
      likes: 8,
      createdAt: '2024-01-14',
      lastActivity: '2024-01-15',
      replies: [
        {
          id: 'r3',
          content: 'Try/catch is the standard approach, but you can also create wrapper functions for cleaner code. I\'ll share some examples in the next lesson.',
          author: 'John Doe',
          authorRole: 'instructor',
          createdAt: '2024-01-15',
          likes: 5
        }
      ]
    }
  ];

  const allTags = Array.from(new Set(discussions.flatMap(d => d.tags)));

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || discussion.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  if (selectedDiscussion) {
    return (
      <div className="p-6">
        <button
          onClick={() => setSelectedDiscussion(null)}
          className="flex items-center text-green-600 hover:text-green-700 mb-6"
        >
          ← Back to Discussions
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedDiscussion.title}</h1>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span>by {selectedDiscussion.author}</span>
                  <span>{selectedDiscussion.courseName}</span>
                  <span>{selectedDiscussion.createdAt}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{selectedDiscussion.likes}</span>
                </button>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedDiscussion.content}</p>

            <div className="flex flex-wrap gap-2">
              {selectedDiscussion.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Replies ({selectedDiscussion.replies.length})
            </h3>

            <div className="space-y-4 mb-6">
              {selectedDiscussion.replies.map(reply => (
                <div key={reply.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                        reply.authorRole === 'instructor' ? 'bg-green-500' : 'bg-blue-500'
                      }`}>
                        {reply.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{reply.author}</p>
                        <p className="text-xs text-gray-500 capitalize">{reply.authorRole}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{reply.createdAt}</span>
                      <button className="flex items-center space-x-1 hover:text-green-600">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{reply.likes}</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{reply.content}</p>
                </div>
              ))}
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Add a Reply</h4>
              <textarea
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={4}
                placeholder="Share your thoughts..."
              ></textarea>
              <div className="flex justify-end mt-3">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showNewDiscussion) {
    return (
      <div className="p-6">
        <button
          onClick={() => setShowNewDiscussion(false)}
          className="flex items-center text-green-600 hover:text-green-700 mb-6"
        >
          ← Back to Discussions
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Start New Discussion</h1>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course
              </label>
              <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>React Fundamentals</option>
                <option>Advanced JavaScript</option>
                <option>Node.js Backend</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="What's your question?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                rows={6}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Provide more details about your question..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Add tags separated by commas (e.g., react, hooks, state)"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Post Discussion
              </button>
              <button
                type="button"
                onClick={() => setShowNewDiscussion(false)}
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Discussions</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Ask questions and share knowledge</p>
        </div>
        <button
          onClick={() => setShowNewDiscussion(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Discussion</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search discussions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Tag className="h-4 w-4 text-gray-400" />
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>#{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Discussions List */}
      <div className="space-y-4">
        {filteredDiscussions.map(discussion => (
          <div
            key={discussion.id}
            onClick={() => setSelectedDiscussion(discussion)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{discussion.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{discussion.content}</p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500 ml-4">
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{discussion.replies.length}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{discussion.likes}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>by {discussion.author}</span>
                <span>{discussion.courseName}</span>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Last activity: {discussion.lastActivity}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {discussion.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
                {discussion.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded-full text-xs">
                    +{discussion.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredDiscussions.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No discussions found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDiscussions;