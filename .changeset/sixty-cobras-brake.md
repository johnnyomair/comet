---
"@comet/cms-api": major
---

Replace ContentScopeModule with UserPermissionsModule

Breaking changes:

-   ContentScope-Module has been removed
-   canAccessScope has been moved to AccessControlService and renamed to isAllowedContentScope
-   role- and rights-fields has been removed from CurrentUser-Object
-   AllowForRole-decorator has been removed
-   Rename decorator SubjectEntity to AffectedEntity
-   Add RequiredPermission-decorator and make it mandatory when using UserPermissionsModule

Upgrade-Guide: tbd