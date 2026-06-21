import { Metadata } from 'next'
import React from 'react'
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - About` },
    description: `Learn about the history and mission of ${serverEnv.APP_NAME}, and how we are helping to spread the message of Islam.`,
}


const AboutPage = () => {
    return (
        <div>AboutPage</div>
    )
}

export default AboutPage