import { GeneralCardHeader } from "@/components/admin/shared/generalCardHeader";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { CakeIcon, HandHeartIcon, HeartIcon, PartyPopperIcon } from "lucide-react";
import { SongPicker } from "./songPicker";

const highlightedMoments = [
  { title: "Welcoming couple", icon: <PartyPopperIcon /> },
  { title: "First dance", icon: <HeartIcon /> },
  { title: "Cake presentation", icon: <CakeIcon /> },
  { title: "Dedication to parents", icon: <HandHeartIcon /> },
];

export function HighlightedMoments() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {highlightedMoments.map(({ title, icon }) => {
        return (
          <Card key={title}>
            <GeneralCardHeader title={title} icon={icon} />
            <CardContent></CardContent>
          </Card>
        );
      })}
    </div>
  );
}
