export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} DriveNest. All rights reserved.
            </p>
          </div>
          <div>
            <a href="/privacy" className="text-sm hover:underline">
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a href="/terms" className="text-sm hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
