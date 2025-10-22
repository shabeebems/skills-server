import TopicModel, { ITopic } from "../models/topic.model";
import { BaseRepository } from "./base.repository";

export class TopicRepository extends BaseRepository<ITopic> {
  constructor() {
    super(TopicModel);
  }
}
