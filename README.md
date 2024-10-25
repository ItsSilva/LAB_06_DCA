# Music Collection App - Lab Instructions

> **Note 1**: If the Firebase import doesn't work, make sure to activate the `"moduleResolution": "node"` configuration in your `tsconfig.json` file, as shown below:
> ```json
> "moduleResolution": "node" 
> /* Specify how TypeScript looks up a file from a given module specifier. */
> ```

> **Note 2**: The following dynamic imports:
> ```typescript
> const { initializeApp } = await import('firebase/app');
> const { getFirestore } = await import('firebase/firestore');
> ```
> can only be used when the `tsconfig.json` file has the following configurations:
> ```json
> "target": "es2020",
> "module": "es2020"
> ```

In this lab, students will work individually using **TypeScript** to develop modular and dynamic components. The main task is to add songs to a collection in the **Firebase** database and have these elements rendered automatically.

## Requirements

- Use **Node.js** for project configuration.
- Use **Firebase** database for data storage.
- Use the `css-loader` dependency to style the components.
- Ensure clean and readable code, with good naming conventions for components, variables, and classes, and clear and appropriate algorithms.
- Follow the correct project file structure:

```bash
project
├── dist
│   ├── bundle.js
│   └── index.html
├── src
│   ├── components
│   │   └── Song
│   │       ├── Song.ts
│   │       └── Song.css
│   ├── types
│   │   └── Song.ts
│   ├── useful
│   │   └── Firebase.ts
│   ├── index.ts
│   └── index.css

## Tasks

1. **Component Development**: Design and develop reusable and modular components using **TypeScript**.
   
2. **App Container**: Use an `app-container` component to render the song list using data fetched from the Firebase database.

3. **Form Handling**: Create a form to submit new song data and send it to the Firebase database.

4. **Song Component**: Each `Song` component must display the following data:
   - Image
   - Title
   - Author
   - Album
   - Date added
   - Duration

5. **Firebase Integration**:
   - In the `Firebase.ts` file, implement functions to both retrieve data from the Firebase database and add new songs to the collection.
