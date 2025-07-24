import React from 'react';
import { ErrorBoundary } from '../shared/ui/ErrorBoundary';
import { Layout } from './layout';
import { HomePage } from '../pages/HomePage';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <HomePage />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
