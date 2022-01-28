yarn init -2

yarn add --dev typescript
yarn add --dev @types/node
yarn plugin import typescript
yarn tsc --init

yarn add next react react-dom

# create pages -- index.tsx

yarn next lint

# https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler
yarn add --dev jest @testing-library/react @testing-library/jest-dom

yarn dlx @yarnpkg/sdks vscode