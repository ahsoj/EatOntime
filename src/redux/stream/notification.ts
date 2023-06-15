import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
// import {isMessage}

export type Channel = "notification" | "general";

export interface Message {
  id: string;
  channel: Channel;
  user: string;
  message: string;
}

const messageAdapter = createEntityAdapter<Message>();

export const wsapi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (build) => ({
    getMessages: build.query<EntityState<Message>, Channel>({
      query: (channel) => `notification/${channel}`,
      transformResponse(response: Message[]) {
        return messageAdapter.addMany(
          messageAdapter.getInitialState(),
          response
        );
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = new WebSocket(`ws://localhost:8888`);
        try {
          await cacheDataLoaded;

          const listner = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.channel !== arg) return;
            updateCachedData((draft) => {
              messageAdapter.upsertOne(draft, data);
            });
          };
          ws.addEventListener("message", listner);
        } catch {}
        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const { useGetMessagesQuery } = wsapi;
