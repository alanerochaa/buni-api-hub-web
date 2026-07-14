import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Feature-based architecture: cada feature só expõe seu barrel
      // público (features/<nome>/index.ts). Importar arquivos internos
      // de outra feature quebra o encapsulamento e cria acoplamento
      // escondido entre domínios.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*/*'],
              message:
                'Importe apenas o barrel público da feature (@/features/<nome>). ' +
                'Dentro da própria feature, use imports relativos para os módulos internos.',
            },
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
])
