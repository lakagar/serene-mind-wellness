
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t bg-muted/40 py-8">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-full bg-wellness-primary p-1 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-handshake">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
                <path d="m18 15-2-2" />
                <path d="m15 18-2-2" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-wellness-dark">SereneMinds</span>
          </Link>
          <p className="text-sm">Mental wellness and support for everyone, anytime, anywhere.</p>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Services</h3>
          <ul className="grid gap-2 text-sm">
            <li><Link to="/ai-chat" className="transition-colors hover:text-wellness-primary">AI Chat Support</Link></li>
            <li><Link to="/counseling" className="transition-colors hover:text-wellness-primary">Professional Counseling</Link></li>
            <li><Link to="/groups" className="transition-colors hover:text-wellness-primary">Group Sessions</Link></li>
            <li><Link to="/meditation" className="transition-colors hover:text-wellness-primary">Guided Meditation</Link></li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Tools</h3>
          <ul className="grid gap-2 text-sm">
            <li><Link to="/self-help" className="transition-colors hover:text-wellness-primary">Self-Help Resources</Link></li>
            <li><Link to="/medication" className="transition-colors hover:text-wellness-primary">Medication Management</Link></li>
            <li><Link to="/mood-tracker" className="transition-colors hover:text-wellness-primary">Mood Tracking</Link></li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Legal</h3>
          <ul className="grid gap-2 text-sm">
            <li><Link to="/privacy" className="transition-colors hover:text-wellness-primary">Privacy Policy</Link></li>
            <li><Link to="/terms" className="transition-colors hover:text-wellness-primary">Terms of Service</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-wellness-primary">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-8 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">© 2025 SereneMinds. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-wellness-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12.07a10 10 0 1 0-11.56 9.87v-6.98H7.5v-2.9h2.95V9.4c0-2.9 1.73-4.5 4.36-4.5a17.8 17.8 0 0 1 2.58.22v2.83h-1.46c-1.43 0-1.88.89-1.88 1.8v2.16h3.2l-.51 2.9h-2.7v6.97A10 10 0 0 0 22 12.07z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-wellness-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.599-.1-.899a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-wellness-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z" />
              <circle cx="16.806" cy="7.207" r="1.078" />
              <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
