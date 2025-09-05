import Link from "next/link"
import { GithubIcon, LinkedinIcon, Mail, TwitterIcon } from "lucide-react"


export function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <Link href="https://github.com/Pradum-codes" className="text-muted-foreground hover:text-primary transition-colors">
              <GithubIcon className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://www.linkedin.com/in/pradum-kumar" className="text-muted-foreground hover:text-primary transition-colors">
              <LinkedinIcon className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://x.com/twr_pradum" className="text-muted-foreground hover:text-primary transition-colors">
              <TwitterIcon className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="mailto:pradumky803@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </Link>
          </div>

          <p className="text-muted-foreground mb-4">Built with Next.js, Tailwind CSS, and lots of Coffee</p>

          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Pradum Kumar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
