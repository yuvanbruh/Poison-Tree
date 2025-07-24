// import { Tabs, TabsList, TabsTrigger, TabsContent } from "/components/ui/tabs";
// import {Tabs}
// import { Tabs,TabsList,TabsTrigger,TabsContent } from "@radix-ui/react-tabs";
// ✅ Correct
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
// import { Tabs } from "../ui/tabs";
import PostsTab from "./PostsTab";
import MoodTab from "./MoodTab";
import WatchlistTab from "./WatchlistTab";
// import WatchlistTabh
import ReadingListTab from "./ReadingListTab";
import EchoesTab from "./EchoesTab";

export default function ProfileTabs() {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="mb-4 flex flex-wrap gap-2 bg-gray-800 p-2 rounded-xl">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="mood">Mood</TabsTrigger>
        <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
        <TabsTrigger value="readinglist">Reading List</TabsTrigger>
        <TabsTrigger value="echoes">Echoes</TabsTrigger>
      </TabsList>

      <TabsContent value="posts"><PostsTab /></TabsContent>
      <TabsContent value="mood"><MoodTab /></TabsContent>
      <TabsContent value="watchlist"><WatchlistTab /></TabsContent>
      <TabsContent value="readinglist"><ReadingListTab /></TabsContent>
      <TabsContent value="echoes"><EchoesTab /></TabsContent>
    </Tabs>
  );
}
