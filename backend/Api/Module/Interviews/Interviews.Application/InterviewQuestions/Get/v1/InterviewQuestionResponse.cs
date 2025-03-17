namespace TalentMesh.Module.Interviews.Application.InterviewQuestions.Get.v1;

public sealed record InterviewQuestionResponse(
    Guid Id,            
    Guid RubricId, 
    Guid InterviewId, 
    string QuestionText
);
