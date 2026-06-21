import { Metadata } from "next"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Blog` },
    description: `Read the latest news and updates from the ${serverEnv.APP_NAME} team.`,
}


const BlogPage = () => {
    return (
        <div>BlogPage</div>
    )
}

export default BlogPage
