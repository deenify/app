import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuranFeatureType } from "./content"

interface FeaturesSectionProps {
  FEATURES: QuranFeatureType[]
}

const FeaturesSection = ({ FEATURES }: FeaturesSectionProps) => {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="blue" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading text-gray-900 mb-4">
            Enhance Your Quran Experience
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powerful tools to help you read, understand, and memorize the Holy
            Quran.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="border-emerald-100 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-2">
                    <Icon className="h-6 w-6 text-emerald-700" />
                  </div>
                  <CardTitle className="text-gray-900 text-lg">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
