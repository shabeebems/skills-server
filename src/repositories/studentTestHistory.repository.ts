import { Types } from "mongoose";
import StudentTestModel, { IStudentTest } from "../models/studentTestHistory";
import { BaseRepository } from "./base.repository";

export class StudentTestHistoryRepository extends BaseRepository<IStudentTest> {
  constructor() {
    super(StudentTestModel);
  }

  async findByStudentId(studentId: string) {
    return this.find({ studentId } as any);
  }

  async findByTestId(testId: string) {
    return this.find({ testId } as any);
  }

  async findByStudentAndTestId(studentId: string, testId: string) {
    return this.findOne({ studentId, testId } as any);
  }

  async findBySubjectIdAndStudentId(subjectId: string, studentId: string) {
    // This will need to join with Test model to filter by subjectId
    // Only return subject-level tests (tests without topicId)
    // Convert string IDs to ObjectIds for proper matching
    if (!subjectId || !studentId) {
      throw new Error("subjectId and studentId are required");
    }
    
    const subjectObjectId = new Types.ObjectId(subjectId);
    const studentObjectId = new Types.ObjectId(studentId);
    
    return this.model
      .find({ studentId: studentObjectId } as any)
      .populate({
        path: "testId",
        match: { 
          subjectId: subjectObjectId,
          $or: [
            { topicId: { $exists: false } },
            { topicId: null }
          ]
        },
        select: "name difficultyLevel questionCount",
      })
      .exec()
      .then((results) => results.filter((item: any) => item.testId !== null));
  }

  async findByTopicIdAndStudentId(topicId: string, studentId: string) {
    // Filter by topicId through Test model where topic belongs to a subject (not a job)
    if (!topicId || !studentId) {
      throw new Error("topicId and studentId are required");
    }
    
    const topicObjectId = new Types.ObjectId(topicId);
    const studentObjectId = new Types.ObjectId(studentId);
    
    return this.model
      .find({ studentId: studentObjectId } as any)
      .populate({
        path: "testId",
        match: { 
          topicId: topicObjectId,
          subjectId: { $exists: true, $ne: null },
          $or: [
            { jobId: { $exists: false } },
            { jobId: null }
          ]
        },
        select: "name difficultyLevel questionCount",
      })
      .exec()
      .then((results) => results.filter((item: any) => item.testId !== null));
  }

  async findByJobIdAndStudentId(jobId: string, studentId: string) {
    // Only return job-level tests (tests without topicId)
    if (!jobId || !studentId) {
      throw new Error("jobId and studentId are required");
    }
    
    const jobObjectId = new Types.ObjectId(jobId);
    const studentObjectId = new Types.ObjectId(studentId);
    
    return this.model
      .find({ studentId: studentObjectId } as any)
      .populate({
        path: "testId",
        match: { 
          jobId: jobObjectId,
          $or: [
            { topicId: { $exists: false } },
            { topicId: null }
          ]
        },
        select: "name difficultyLevel questionCount",
      })
      .exec()
      .then((results) => results.filter((item: any) => item.testId !== null));
  }

  async findByJobTopicIdAndStudentId(topicId: string, studentId: string) {
    // Filter by topicId through Test model where topic belongs to a job
    if (!topicId || !studentId) {
      throw new Error("topicId and studentId are required");
    }
    
    const topicObjectId = new Types.ObjectId(topicId);
    const studentObjectId = new Types.ObjectId(studentId);
    
    return this.model
      .find({ studentId: studentObjectId } as any)
      .populate({
        path: "testId",
        match: { 
          topicId: topicObjectId,
          jobId: { $exists: true, $ne: null }
        },
        select: "name difficultyLevel questionCount",
      })
      .exec()
      .then((results) => results.filter((item: any) => item.testId !== null));
  }
}

