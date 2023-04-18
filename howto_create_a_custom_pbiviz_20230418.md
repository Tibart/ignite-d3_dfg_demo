Howto Create a Custom PowerBi Visual
====================================

- [Howto Create a Custom PowerBi Visual](#howto-create-a-custom-powerbi-visual)
- [Definities](#definities)
- [Introduction](#introduction)
- [Fundamentals](#fundamentals)
- [Set-up environment](#set-up-environment)
- [Start a new project](#start-a-new-project)
  - [Determine the capabilities \& properties](#determine-the-capabilities--properties)
  - [dataRoles](#dataroles)
  - [dataViewMappings](#dataviewmappings)
- [Notities](#notities)
- [Links](#links)

# Definities


# Introduction
After creating a custom visual for the project Fellowmining the opportunity arised to do it again. This gave a new opportunity to show off what i learned and brag about it in a blog post/how-to document.

# Fundamentals
Before you can start developing a custom PowerBi visual you must have an basic understanding of PowerBI, Node.js, TypeScript (JavaScript), React, and the D3 framework. 

# Set-up environment
If you are confident that you know enough about the above mentioned subjects, you need to setup you development environment to get started. Follow the steps in the following article to install Node.js, install the PowerBI visuals tools package, create and install a certificate, install additional libraries, and set-up PowerBI service for development: [https://learn.microsoft.com/en-us/power-bi/developer/visuals/environment-setup](https://learn.microsoft.com/en-us/power-bi/developer/visuals/environment-setup)

! Important step is to install a localhost certificate for development. After installing `pbiviz` you cab install this certificate by executing the following command in a terminal: `pbiviz --install-cert`. You may need to restart your computer to make the certificate work. If the certificate is loaden and the visual is started you need to navigate to `https://localhost:8080/assets` and click advanced and proceed. If you don't the visual wil not be loaden into PowerBi.

# Start a new project
Create a new folder for your project and create a new project using `pbiviz` tool, like so:

```shell
> pbiviz new <projectName>
```

When this setup is successfully concluded there are a couple of files and folders created. For more information about each file or folder check: [Folder and file description]([https://](https://learn.microsoft.com/en-us/power-bi/developer/visuals/visual-project-structure#folder-and-file-description)).

Before you go forward, please take a look at `pbiviz.json`. When you want to package your visual you must have changed the author's name and email.

## Determine the capabilities & properties
A good first step is to think about what your visual is going show and what it needs to visualize that. This outline is defined in the `capabilities.json` file, which can be found in the root of your project folder. Not all capabilities are clear now, so you probably will come back to this file fairly often. Check following website for more information about capabilities and properties: [Capabilities and properties of Power BI visuals](https://learn.microsoft.com/en-us/power-bi/developer/visuals/capabilities).

## dataRoles
To get started with your visual you first need to define the data you need by determining the `dataRoles` in `capabilities.json`.
Dat roles are the fields which you see in the properties pane of PowerBi, and are the data columns you wil be visualizing.

There are three kinds of data roles:
1. `Grouping`: field that is used to group the measure fields on; 
2. `Measure`: field that wil be taken the sum, avg or count of;
3. `GroupingOrMeasure`: this field can be either of above.

Beside the kind of field you need to determine what type of data you expect to receive, i.e.:
* Bool
* integer
* numeric
* text
* geography

It is possible to add multiple types and setup a preferred type.

```json
"dataRoles": [
    {
        "displayName": "Category",
        "name": "demoCategory",
        "kind": "Grouping",
        "requiredTypes": [
            {
                "text": true
            }
        ]
    },
    {
        "displayName": "Measure",
        "name": "demoMeasure",
        "kind": "Measure",
        "requiredTypes": [
            {
                "integer": true
            },
            {
                "numeric": true
            }
        ],
        "preferredTypes": [
            {
                "integer": true
            }
        ]
    }
]
```

## dataViewMappings
The following subject is data view mappings. Under `dataViewMappings` in the `capabilities.json` you set the way the data is received from PowerBi to the visual.

To go further with your visual, take a look at the following subjects and make the necessary modifications in `capabilities.json`: 

* [Conditions](https://learn.microsoft.com/en-us/power-bi/developer/visuals/dataview-mappings#conditions)
* [Single data mapping](https://learn.microsoft.com/en-us/power-bi/developer/visuals/dataview-mappings#single-data-mapping)
* [Categorical data mapping](https://learn.microsoft.com/en-us/power-bi/developer/visuals/dataview-mappings#categorical-data-mapping)
* [Mapping tables](https://learn.microsoft.com/en-us/power-bi/developer/visuals/dataview-mappings#mapping-tables)
* [Matrix data mapping](https://learn.microsoft.com/en-us/power-bi/developer/visuals/dataview-mappings#matrix-data-mapping)

The group data mapping is probably the mapping you wil go for.

A subject worth looking into if you have to handle a lot of data is the [Data reduction algorithm](https://learn.microsoft.com/en-us/power-bi/developer/visuals/dataview-mappings#data-reduction-algorithm). 

# Notities


# Links
* [PowerBI visuals documentation](https://learn.microsoft.com/en-us/power-bi/developer/visuals/)
* [PowerBI visual github](https://github.com/PowerBi-Projects/PowerBI-visuals)
* [Node.js](https://nodejs.org/en/)
* [NodeSchool](https://nodeschool.io/)
* [TypeScript](https://www.typescriptlang.org/)
* [React](https://reactjs.org/)


---

[//]: # (Reference links)

<style>img{vertical-align: top;padding: 7px;}</style>