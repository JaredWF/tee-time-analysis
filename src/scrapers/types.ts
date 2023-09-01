import { AddTeeTimeInput } from "@/graphql/types/types";

export type Scraper = (date: string) => Promise<AddTeeTimeInput[]>;