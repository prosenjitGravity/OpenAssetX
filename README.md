<!-- # Simple Online Marketplace (Blockchain Training - Proof of Concept) -->

## Project Overview

This project aims to build a simple online marketplace for selling used assets, leveraging blockchain technology for secure and transparent transactions. The platform will feature a native "money token" for all transactions and "asset tokens" to represent ownership of listed items. This serves as a Proof of Concept (PoC) to demonstrate the integration of a React UI, Node.js backend, and Ethereum/Polygon smart contracts.

## Core Requirements & Features

### 1. Marketplace Functionality

*   **Used Asset Sales:** Users can list and sell used assets (e.g., books, electronics, art supplies).
*   **Asset Enrollment:** A user can "enroll" any used asset they wish to sell, which triggers the creation of an associated "asset token".
*   **Asset Pricing:** Sellers tag a price for their assets in terms of the native "money token".
*   **Asset Purchase:** Buyers can purchase assets by exchanging "money tokens" from their wallet.
*   **Reselling:** Buyers who acquire an asset can subsequently resell it on the platform.

### 2. Token System (ERC1155 Standard)

The platform will utilize two types of tokens, both adhering to the **ERC1155 Multi-Token Standard**:

*   **Money Token (Native Token):**
    *   Used for all monetary transactions within the marketplace.
    *   **Welcome Offer:** Users receive `1000` money tokens upon successful registration.
    *   **Token Purchase:** Users can acquire additional money tokens by exchanging their existing Ether (ETH) or Matic (MATIC).
*   **Asset Tokens:**
    *   A unique asset token is created for each individual used asset enrolled on the platform.
    *   **Ownership Representation:** The ownership of an asset is represented by holding its corresponding asset token.
    *   **Ownership Transfer:** When an asset is purchased, the ownership is transferred to the new user through the transfer of the asset token in exchange for money tokens.

### 3. Ownership History

*   **Complete History:** For every asset, a complete history of its ownership (transfer of asset tokens) must be displayed on the asset's information page. This ensures transparency and traceability.

## Technology Stack

*   **UI (Frontend):** React (built with React.js App Router)
    *   **Styling:** External CSS with CSS Modules for a professional and modular design.
<!-- *   **Backend:** Node.js -->
*   **Blockchain Platform:** Ethereum / Polygon
*   **Smart Contracts:** Solidity (ERC1155 standard for both Money and Asset tokens)

## Architectural Considerations

*   The solution must clearly demonstrate how the **Node.js Backend connects and interacts with the Smart Contract code** deployed on the blockchain.
*   The UI, Backend, and Smart Contracts are distinct but interconnected components of the overall system.

## Current UI Status (Frontend)

The user interface has been developed using React with React.js App Router, focusing on a professional and standard design. It utilizes external CSS files and CSS Modules for component-scoped styling, ensuring a clean and maintainable codebase.

**Implemented UI Pages/Components:**

*   **Landing Page (`app/page.jsx`):**
    *   Composed of modular components: `SiteHeader`, `HeroSection`, `FeaturesSection`, `CtaSection`, `SiteFooter`.
    *   Professional design with clear calls-to-action and feature highlights.
*   **Registration Page (`app/register/page.jsx`):**
    *   Form for new user registration, including fields for full name, email, password, and wallet address.
    *   Highlights the "1000 money tokens free" welcome offer.
*   **Login Page (`app/login/page.jsx`):**
    *   Standard login form for existing users.
*   **Dashboard Page (`app/dashboard/page.jsx`):**
    *   User-specific overview: money token balance, assets owned, assets listed, total sales.
    *   Quick action buttons (List New Asset, Buy More Tokens, Browse Marketplace).
    *   Tabs to view "My Listed Assets" and "Assets I Own" with mock data.
*   **Marketplace Page (`app/marketplace/page.jsx`):**
    *   Browse available assets with search, category, and price range filters.
    *   Displays asset cards with image, name, price, condition, seller, and category.
*   **Asset Details Page (`app/asset/[id]/page.jsx`):**
    *   Detailed view of a specific asset, including description, specifications, current price, and token ID.
    *   **Ownership History:** Displays a complete, mock blockchain-verified ownership trail.
    *   Seller information and a "Buy Now" button.
*   **List Asset Page (`app/list-asset/page.jsx`):**
    *   Form for users to enroll new assets for sale.
    *   Fields for asset name, description, category, condition, price, and image upload.
    *   Explains the process of asset token creation.
*   **Buy Tokens Page (`app/buy-tokens/page.jsx`):**
    *   Interface to exchange ETH/MATIC for money tokens.
    *   Displays current token balance and exchange rate.
    *   Includes mock wallet information and transaction fee breakdown.

**Styling Approach:**

*   **`app/globals.css`:** Contains global styles, CSS custom properties (variables) for colors, typography, spacing, shadows, and basic utility classes.
*   **`styles/components.css`:** Defines styles for reusable UI components like buttons, cards, forms, and badges.
*   **`styles/layout.css`:** Manages the overall page structure, navigation, hero sections, and footers.
*   **`styles/marketplace.css`:** Specific styles for the marketplace grid, filters, and asset cards.
*   **`styles/dashboard.css`:** Specific styles for dashboard elements like stats cards and asset management sections.
*   **CSS Modules (`.module.css`):** Each major component (e.g., `site-header.module.css`, `hero-section.module.css`) has its own scoped CSS file to prevent style collisions and improve modularity.

## Getting Started (Frontend)

To run the current UI:

1.  **Clone the repository:**
    \`\`\`bash
    git clone <your-repo-url>
    cd 
    \`\`\`
2.  **Install dependencies:**
    \`\`\`bash
    npm install
    # or yarn install
    \`\`\`
3.  **Run the development server:**
    \`\`\`bash
    npm run dev
    # or yarn dev
    \`\`\`
4.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Future Work & React Steps

The current UI provides a strong foundation. To complete the PoC, the following steps are crucial:

1.  **Smart Contract Development:**
    *   Implement ERC1155 smart contracts for both the "Money Token" and "Asset Tokens" on Ethereum/Polygon.
    *   Develop functions for token minting (initial welcome offer, buying tokens), burning, and transfers.
    *   Implement asset enrollment and ownership transfer logic within the smart contracts.
2.  **Backend Development (Node.js):**
    *   Create API endpoints to interact with the deployed smart contracts (e.g., register user, list asset, buy asset, buy tokens, fetch ownership history).
    *   Implement wallet connection and transaction signing logic.
    *   Set up a database (if needed for off-chain data, though blockchain should handle core ownership).
3.  **Blockchain Integration:**
    *   Integrate a Web3 library (e.g., `ethers.js` or `web3.js`) in the backend and potentially the frontend for direct smart contract interaction.
    *   Connect to an Ethereum/Polygon node (e.g., via Infura, Alchemy).
    *   Handle environment variables for API keys and contract addresses.
4.  **Wallet Connection (Frontend):**
    *   Implement a wallet connection feature (e.g., MetaMask) to allow users to interact with the blockchain directly from the UI.
5.  **Error Handling & Loading States:**
    *   Add robust error handling and loading indicators for all blockchain interactions.
6.  **Deployment:**
    *   Deploy smart contracts to a testnet (e.g., Sepolia, Mumbai) and then to a mainnet.
    *   Deploy the React.js application and Node.js backend to a hosting platform (e.g., Vercel for React.js).