import React from 'react'
import { Metadata } from "next"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Features` },
    description: `Learn about the features of ${serverEnv.APP_NAME} and how they can help you in your daily life.`,
}


const FeaturesPage = () => {
    return (
        <div>FeaturesPage</div>
    )
}

export default FeaturesPage