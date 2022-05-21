interface JobInfoPanelProps {
  id: string;
  queueName: string;
  jobName: string;
  timestamp: Date;
  processedOn?: Date;
  finishedOn?: Date;
  attemptsMade?: number;
}

export default JobInfoPanelProps;
