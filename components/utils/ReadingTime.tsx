import { Clock } from "lucide-react"

interface ReadingTimeProps {
  minutes: number
}

export default function ReadingTime({ minutes }: ReadingTimeProps) {
  return (
    <span className="flex items-center">
      <Clock className="h-3 w-3 mr-1" />
      읽는 시간: {minutes}분
    </span>
  )
}
