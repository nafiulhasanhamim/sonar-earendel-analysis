using System.Collections.ObjectModel;

namespace TalentMesh.Shared.Authorization;

public static class TMRoles
{
    public const string Admin = nameof(Admin);
    public const string Basic = nameof(Basic);

    public static IReadOnlyList<string> DefaultRoles { get; } = new ReadOnlyCollection<string>(new[]
    {
        Admin,
        Basic
    });

    public static bool IsDefault(string roleName) => DefaultRoles.Any(r => r == roleName);
}





// public static class TMRoles
// {
//     public const string Admin = nameof(Admin);
//     public const string HR = nameof(HR);
//     public const string Interviewer = nameof(Interviewer);
//     public const string Basic = nameof(Basic);
//     public const string Candidate = nameof(Candidate);

//     public static IReadOnlyList<string> DefaultRoles { get; } = new ReadOnlyCollection<string>(new[]
//     {
//         Admin,
//         HR,
//         Interviewer,
//         Basic,
//         Candidate
//     });

//     public static bool IsDefault(string roleName) => DefaultRoles.Any(r => r == roleName);
// }