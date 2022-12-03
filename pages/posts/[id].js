import Link from "next/link";
import Layout from "../../components/Layout";
import { getAllPostsIds, getPostData } from "../../lib/posts";

export default function Post({ post }) {
    if(!post) {
        return <div>Loading...</div>;
    }

    return (
        <Layout title={post.title}>
            <p className="m-4">
                {"ID : "}
                {post.id}
            </p>
            <p className="mb-8 text-xl font-bold">{post.title}</p>
            <p className="px-10">{post.body}</p>
            <Link href="/blog-page">
                <div className="flex cursor-pointer mt-12">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    <span>Back to blog</span>
                </div>
            </Link>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = await getAllPostsIds();

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const { post: post } = await getPostData(params.id);

    return {
        props: {
            post
        }
    }
}
