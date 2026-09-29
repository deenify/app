/** Demo values — replace with geolocation + qibla calculation API. */
export const QIBLA_DEMO_BEARING_DEG = 58
export const QIBLA_DEMO_DISTANCE_KM = 10247

export const QIBLA_EDITORIAL = {
    lead: "Qibla is direction, not distance: every prayer line converges on the Kaʿbah as a shared axis of worship for the ummah. Your compass bridges local geography to that single focal point.",
    accuracy:
        "Metal, speakers, and indoor environments skew magnetometers. Calibrate outdoors when possible, hold the device flat, and treat the bearing as a refined estimate—not a substitute for learning prayer from qualified teachers.",
} as const

export const QIBLA_PROTOCOL_STEPS = [
    "Hold the phone flat, parallel to the ground—tilt breaks compass fusion.",
    "Calibrate if the browser prompts; figure-eight motions often help sensors settle.",
    "Face your body until the indicator aligns; verify once more before takbīr.",
    "Step away from large metal objects, vehicles, and thick concrete with wiring.",
] as const

export const QIBLA_ORIENTATION_NOTE =
    "Standing toward the Qibla externalizes tawḥīd in space: one qiblah, one ummah, one Lord. Technology should serve that orientation—not replace adab or learning from teachers."

const CARDINALS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const

export function cardinalFromDegrees(deg: number) {
    const n = ((deg % 360) + 360) % 360
    const index = Math.round(n / 45) % 8
    return CARDINALS[index]
}
