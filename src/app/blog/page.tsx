import { Metadata } from "next"
import { getAllBlogMetadata } from "@/lib/blog"
import BlogListing from "@/components/blog-listing"

export const metadata: Metadata = {
    title: "All Blogs | huzi.pk",
    description: "Browse all blog posts on technology, guides, privacy, Linux, and more at huzi.pk",
    openGraph: {
        title: "All Blogs | huzi.pk",
        description: "Browse all blog posts on technology, guides, privacy, Linux, and more",
        type: "website",
        url: "https://huzi.pk/blog",
    },
}

export default function BlogPage() {
    const posts = getAllBlogMetadata()

    return <BlogListing posts={posts} />
}
