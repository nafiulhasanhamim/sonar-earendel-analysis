
using MediatR;

namespace TalentMesh.Module.Candidate.Application.CandidateProfile.Create.v1;

// just testing
// if another github account work or not
public sealed record CreateCandidateProfileCommand(
    
    string Resume,
    string Skills,
    string Experience,
    string Education,
    Guid UserId
    ) : IRequest<CreateCandidateProfileResponse>;





