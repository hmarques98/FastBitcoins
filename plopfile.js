module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/shared/components/{{pascalCase name}}/index.ts',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Component.index.js.hbs',
      },
      {
        type: 'add',
        path: 'src/shared/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component.js.hbs',
      },
      {
        type: 'add',
        path: 'src/shared/components/{{pascalCase name}}/{{pascalCase name}}.styles.ts',
        templateFile: 'plop-templates/Component.styles.js.hbs',
      },
    ],
  })

  plop.setGenerator('screen', {
    description: 'Create a screen',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your screen name?',
      },
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'module',
        // Prompt to display on command line
        message: 'What is your module name for your screen?',
      },
    ],
    actions: [
      {
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: 'src/services/navigation/index.tsx',
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_SCREEN */`,
        templateFile: 'plop-templates/Screen.navigation.js.hbs',
      },
      {
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: 'src/services/navigation/index.tsx',
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_SCREEN_PARAMS */`,
        template: `[SCREENS.{{constantCase module}}_{{constantCase name}}]: undefined`,
      },
      {
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: 'src/services/navigation/index.tsx',
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_SCREEN_IMPORT */`,
        template: `import {{pascalCase name}} from 'ui/{{pascalCase module}}/screens/{{pascalCase name}}'`,
      },
      {
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: 'src/services/navigation/Navigation.enums.ts',
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_SCREEN */`,
        template: `{{constantCase module}}_{{constantCase name}} = '{{constantCase module}}_{{constantCase name}}',`,
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/ui/{{pascalCase module}}/screens/{{pascalCase name}}/index.ts',
        // Handlebars template used to generate content of new file
        template: `export { default } from './{{pascalCase name}}Screen'`,
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/ui/{{pascalCase module}}/screens/{{pascalCase name}}/{{pascalCase name}}Screen.tsx',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Screen.js.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/ui/{{pascalCase module}}/screens/{{pascalCase name}}/{{pascalCase name}}Screen.styles.ts',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Screen.styles.js.hbs',
      },
    ],
  })

  plop.setGenerator('stackNavigation', {
    description: 'Create a new Stack of Screens',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'stack',
        // Prompt to display on command line
        message: 'What is your new Stack name?',
      },
    ],
    actions: [
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/services/navigation/Stacks/{{pascalCase stack}}/index.tsx',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Stack.js.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/services/navigation/Stacks/{{pascalCase stack}}/{{pascalCase stack}}.enums.ts',
        // Handlebars template used to generate content of new file
        template: `export enum SCREENS { 
          {{constantCase stack}}_HOME = '{{constantCase stack}}_HOME', 
          /* PLOP_INJECT_ENUM */ 
        }`,
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/ui/{{pascalCase stack}}/screens/Home/index.ts',
        // Handlebars template used to generate content of new file
        template: `export { default } from './HomeScreen'`,
      },

      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/ui/{{pascalCase stack}}/screens/Home/HomeScreen.tsx',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Screen.stack.js.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/ui/{{pascalCase stack}}/screens/Home/HomeScreen.styles.ts',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Screen.styles.js.hbs',
      },
      {
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: 'src/services/navigation/index.tsx',
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_NAVIGATOR */`,
        templateFile: 'plop-templates/Stack.navigation.js.hbs',
      },
      {
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: 'src/services/navigation/index.tsx',
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_NAVIGATOR_IMPORT */`,
        template: `import {{pascalCase stack}}Navigator from './Stacks/{{pascalCase stack}}'`,
      },
      {
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: 'src/services/navigation/index.tsx',
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_NAVIGATOR_PARAMS */`,
        template: `[SCREENS.{{constantCase stack}}_STACK]: undefined`,
      },
      {
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: 'src/services/navigation/Navigation.enums.ts',
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_SCREEN */`,
        template: `{{constantCase stack}}_STACK = '{{constantCase stack}}_STACK',`,
      },
    ],
  })

  plop.setGenerator('screenByStack', {
    description: 'Create a new screen by Stack',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'stack',
        // Prompt to display on command line
        message: 'What is your new Stack name?',
      },
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'screen',
        // Prompt to display on command line
        message: 'What is your new Screen name by stack?',
      },
    ],
    actions: [
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/ui/{{pascalCase stack}}/screens/{{pascalCase screen}}/index.ts',
        // Handlebars template used to generate content of new file
        template: `export { default } from './{{pascalCase screen}}Screen'`,
      },

      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/ui/{{pascalCase stack}}/screens/{{pascalCase screen}}/{{pascalCase screen}}Screen.tsx',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Screen.js.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/ui/{{pascalCase stack}}/screens/{{pascalCase screen}}/{{pascalCase screen}}Screen.styles.ts',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Screen.styles.js.hbs',
      },

      {
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: 'src/services/navigation/Stacks/{{pascalCase stack}}/index.tsx',
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_SCREEN */`,
        templateFile: 'plop-templates/ScreenByStack.navigation.js.hbs',
      },

      {
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: 'src/services/navigation/Stacks/{{pascalCase stack}}/index.tsx',
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_SCREEN_PARAMS */`,
        template: `[SCREENS.{{constantCase stack}}_{{constantCase screen}}]: undefined`,
      },

      {
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: 'src/services/navigation/index.tsx',
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_SCREEN_IMPORT */`,
        template: `import {{pascalCase name}} from 'ui/{{pascalCase module}}/screens/{{pascalCase name}}'`,
      },
      {
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: 'src/services/navigation/Navigation.enums.ts',
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_ENUM */`,
        template: `{{constantCase module}}_{{constantCase name}} = '{{constantCase module}}_{{constantCase name}}',`,
      },
    ],
  })
}
