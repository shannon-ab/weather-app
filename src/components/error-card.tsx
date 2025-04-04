import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function ErrorCard({ error }: { error: Error }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Failed to fetch weather data: {error.message}</p>
        </CardContent>
      </Card>
    )
  }