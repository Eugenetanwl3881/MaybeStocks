import { useAuth } from "../hooks/useAuth";
import Channel from "../components/Chat/Channel";
import "firebase/compat/auth";
import "firebase/compat/firestore";

function ChatPage() {

    const { user } = useAuth();
  
    const renderContent = () => {
  
      if (user) return <Channel user={user} />;
  
      return (
        <div className="flex items-center justify-center shadow-md h-full">
          <div className="flex flex-col items-center justify-center max-w-xl w-full mx-4 p-8 rounded-md shadow-card bg-white dark:bg-coolDark-600 transition-all">
            <h2 className="mb-2 text-3xl flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="flex-shrink-0 w-12 h-12 mr-1 text-primary-500"
              >
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"
                />
              </svg>
              Chat Page
            </h2>
            <p className="mb-8 text-lg text-center">
              The easiest way to chat with people all around the world.
            </p>
          </div>
        </div>
      );
    };
  
    return (
      <div className="flex flex-col h-full bg-white dark:bg-coolDark-500 dark:text-white transition-colors">
        <header
          className="flex-shrink-0 flex items-center justify-between px-4 sm:px-8 shadow-md"
          style={{ height: 'var(--topbar-height)' }}
        >
        </header>
        <main
          className="flex-1"
          style={{ maxHeight: 'calc(100% - var(--topbar-height))' }}
        >
          {renderContent()}
        </main>
      </div>
    );
  }

export default ChatPage;
