import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-slate-100 dark:bg-gray-900 py-4 mt-0">
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-4 flex flex-wrap justify-center space-x-6 text-gray-600 dark:text-gray-400">
        <Link href="/about" className="hover:text-gray-800 dark:hover:text-gray-200">About</Link>
        <Link href="/terms" className="hover:text-gray-800 dark:hover:text-gray-200">Terms of Service</Link>
        <Link href="/privacy" className="hover:text-gray-800 dark:hover:text-gray-200">Privacy Policy</Link>
        <Link href="/contact" className="hover:text-gray-800 dark:hover:text-gray-200">Contact</Link>
      </div>
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 text-center text-gray-600 dark:text-gray-400">
        &copy; {currentYear} SocialSphere. All rights reserved.
      </div>
    </footer>
  );
}
