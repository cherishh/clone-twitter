 import { Database as DB } from "@/lib/database.types";


 
 


 declare global {
  type Database = DB
  type TweetWithAuthor = Tweet & {
    likes: number;
    user_has_liked_tweet: boolean;
    author: Profile;
  }
  type Tweet = DB['public']['Tables']['tweets']['Row'];
  type Profile = DB['public']['Tables']['profiles']['Row'];
 } 