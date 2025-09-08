```mermaid
    sequenceDiagram
        participant browser
        participant server
        participant user

        browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
        activate server
        server-->>browser: HTML document
        deactivate server

        user-->>browser: Data note field
        user-->>browser: Data email field
        Note over browser: validates email data 
        browser-->>user: Alerts any mistake
        user-->>browser: Click send button

        browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        activate server
        server-->>browser: [{ "content": "Data saved", "date": "2025-09-08" }]
        deactivate server

        browser-->>user: Alerts operation status
        Note over browser: add note in page
```