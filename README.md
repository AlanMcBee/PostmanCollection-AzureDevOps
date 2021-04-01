PostmanCollection-AzureDevOps
=============================

This Postman collection simplifies invoking the Azure DevOps REST API.

Postman Collections and Environments
------------------------------------

Postman Collections are great for storing a family of operation methods, placeholder variables, authorizations, scripts, and other parts of the essential information needed to invoke operations on a service in general.

Postman Environments are great for applying specific identifiers, secrets, or other information that is needed to take the general information from the Collection and apply it to one specific instance of a service.

The way Postman resolves variable (and placeholder) values follows a specific order. A value set in the Environment will override a value set in the Collection. I use this rule to create variables and requests in the Collection that can rely on only a few values set in the selected Environment to provide all the needed information.

### Collections

The Collection Variables contain a collection of values that are used by the requests to assemble URLs, requests, and identify properties of request or response objects, regardless of which Azure DevOps Service or Azure DevOps Server (or Team Foundation Server) is being targeted.

### Environments

This repository has a template Environment. To use this environment:

1. Import the environment into Postman.

2. Either rename the environment or duplicate it with a new name to reflect your Azure DevOps organization or Team Foundation collection.

3. Set the Current Value column of the variables in the environment accordingly. The variables used by the Collection are all prefixed with `My:`

If you target more than one organization or collection, just import the environment again or create duplicate environments. The Collection is expecting to target only one instance (an Azure DevOps organization or a Team Foundation collection) at at time.

IMPORTANT: ***DO NOT STORE SENSITIVE VALUES LIKE PERSONAL ACCESS TOKENS OR PASSWORDS IN THE \"INITIAL VALUE\" COLUMN. ONLY STORE THESE SENSITIVE VALUES IN THE \"CURRENT VALUE\" COLUMN.***

Rather than switch environments to work with multiple projects, I find myself creating environment-local variables for the projects I want, then set the `My:Project` and `My:ProjectId` values to those variables. See the Example Environment to see how that could look. I also do this with Teams on a Project.

Authorization
-------------

### Enable OAuth 2.0 authorization

If you want to use OAuth 2.0 access (arguably the preferred means of accessing Azure DevOPs REST API for delegated, or user, permissions), you only need to acquire the OAuth 2.0 token at the Collection properties.

(instuctions forthcoming...)

### Enable Personal Access Token authorization

The Collection is pre-configured to expect a Personal Access Token (PAT), and the Collection is configured to apply the Personal Access Token that you set in the Current Value of the Environment variable named `My:Ads:PersonalAccessToken`.

However, the requests in the collection (what I call operations) are built by importing the OpenAPI documents from the reference GitHub repository (see References, below). These operation specifications expect the requests to be made using OAuth 2.0.

To allow each operation to use a Personal Access Token instead of the OAuth token, you must override the Authorization tab of each operation, and change each one to use the setting **Inherit auth from parent**.

Alternately, you can modity this collection before importing it into Postman, and remove all of the JSON properties that look like this:

``` json
"auth": {
    "type": "oauth2"
},
```

#### Reset the Collection Authorization to use a PAT

If you need to reset the Collection's Authorization settings to support a Personal Access Token, follow these steps:

1. Edit the Collection's and select the Authorization tab.

2. Set the Authorization method to **Basic Auth**

3. Clear the **Username** field and leave it blank.

4. Set the **Password** field to this exact literal value (including the double curly-braces): `{{Ads:PersonalAccessToken}}`

5. Select the Variables tab

6. Make sure the variables listed include these two entries:

| Variable name                | Initial value                    | Current value                    |
| ---------------------------- | -------------------------------- | -------------------------------- |
| `Ads:PersonalAccessToken`    | `{{My:Ads:PersonalAccessToken}}` | `{{My:Ads:PersonalAccessToken}}` |
| `My:Ads:PersonalAccessToken` | OVERRIDE ME IN THE ENVIRONMENT   | OVERRIDE ME IN THE ENVIRONMENT   |

7. Close the Collection settings editor

8. Open the Environment you want to use for the targeted Azure DevOps instance. Suggested naming convention (choose the appropriate depth as needed):

* Azure DevOps ▶ {*organization*}

* Azure DevOps ▶ {*organization*}/{*project*}

* Azure DevOps ▶ {*organization*}/{*project*}/{*team*}

9.  Find or create the variable named `{{My:Ads:PersonalAccessToken}}`. Set the **Current Value** to the exact value copied from Azure DevOps. ONLY use the **Current Value** value, *never* the Initial Value, in order to prevent the value from being shared outside your local work area.

References
==========

Azure DevOps Personal Access Tokens
-----------------------------------

See https://docs.microsoft.com/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate for instructions on creating and using Personal Access Tokens (PAT).

Azure DevOps REST API
---------------------

The Azure DevOps REST Api is documented at https://docs.microsoft.com/rest/api/azure/devops

### OpenAPI / Swagger

The Azure DevOps REST API OpenAPI (Swagger) specifications are at https://github.com/MicrosoftDocs/vsts-rest-api-specs

