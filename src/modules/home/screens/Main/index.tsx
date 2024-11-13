import { Skeleton } from "@global-components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@global-components/ui/tabs";
import UserSuggestions from "@global-components/UserSuggestions";
import FeedCompose from "@modules/home/components/FeedCompose";
import FeedExploreCompose from "@modules/home/components/FeedExploreCompose";

const HomeScreen = () => {
  return (
    <main className="flex gap-8 mx-auto w-fit">
      <div className="w-[32rem] mt-4">
        <Tabs defaultValue="feed">
          <div className="p-4 border">
            <TabsList className="grid w-full grid-cols-2 ">
              <TabsTrigger value="feed">For you</TabsTrigger>
              <TabsTrigger value="explore">Explore</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="feed" className="mt-0">
            <FeedCompose />
          </TabsContent>
          <TabsContent value="explore" className="mt-0">
            <FeedExploreCompose />
          </TabsContent>
        </Tabs>
      </div>

      <UserSuggestions />
    </main>
  );
};

export default HomeScreen;
