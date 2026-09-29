"use client"

import Image from "next/image"
import Stagger from "@/components/shared/motion/Stagger"
import MarketingSectionHead from "../home/MarketingSectionHead"
import { clientEnv } from "@/env/client"
import { ABOUT_TEAM } from "./content"

const CONTENT_BASE_DELAY = 0.45
const STAGGER_STEP = 0.1

const AboutTeamSection = () => {
    return (
        <section className="bg-white py-14 sm:py-20 lg:py-24">
            <div className="container">
                <MarketingSectionHead
                    lead="Meet the"
                    accent="team"
                    subtitle={`The people shaping ${clientEnv.APP_NAME} — product, engineering, content, and community — united by daily practice.`}
                />

                <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                    {ABOUT_TEAM.map((member, index) => (
                        <Stagger
                            key={member.name}
                            index={index}
                            animation="while_in_view"
                            variant="up"
                            baseDelay={CONTENT_BASE_DELAY}
                            delay={STAGGER_STEP}
                            duration={0.85}
                        >
                            <article className="h-full overflow-hidden rounded-md border border-gray-100 bg-marketing-card sm:rounded-2xl">
                                <div className="relative aspect-[4/3] overflow-hidden bg-emerald-50">
                                    <Image
                                        src={member.avatar}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 100vw, 25vw"
                                    />
                                </div>
                                <div className="p-4 sm:p-5">
                                    <h3 className="font-heading text-base font-semibold text-gray-900">
                                        {member.name}
                                    </h3>
                                    <p className="mt-0.5 text-xs font-medium text-emerald-700 sm:text-sm">
                                        {member.role}
                                    </p>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{member.bio}</p>
                                </div>
                            </article>
                        </Stagger>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AboutTeamSection
