# Calorie Intake Calculator & Blind Inference Demo

[![Nillion](https://img.shields.io/badge/Powered%20by-Nillion-green)](https://nillion.com/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

A secure, privacy-preserving web application that demonstrates **Blind Computation** using the [Nillion Network](https://nillion.com/). This project features a modern **Dark Mode UI** and allows users to perform sensitive calculations—like health data analysis and housing price predictions—without ever revealing their raw input data to the model owner.

## 🚀 Features

-   **Blind Computation**: Execute code on private data while keeping inputs hidden from the compute node.
-   **Privacy-First Design**: Leverages Nillion's Multi-Party Computation (MPC) technology.
-   **Modern User Interface**:
    -   Premium **Dark Mode** theme.
    -   Guided **Stepper Workflow** for complex operations.
    -   Responsive Design using **Material UI** and **Tailwind CSS**.
-   **Dual Demos**:
    1.  **Calorie Intake Calculator**: Estimate daily calorie needs securely.
    2.  **Housing Price Predictor**: Predict house prices using a linear regression model on private inputs.

## 🛠️ Prerequisites

Before running the project, ensure you have the following installed:

1.  **Node.js**: [Download & Install](https://nodejs.org/) (Version 16 or higher recommended).
2.  **Nillion SDK & Tools**: Required for running the local devnet.

    ```bash
    # Install Nillion SDK and tools
    curl https://nilup.nilogy.xyz/install.sh | bash
    ```

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd calorie-intake-calculator-main
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

## 🔧 Configuration

To fully enable Nillion features, you need to connect to a Nillion network (Devnet or Testnet).

### Option A: Local Devnet (Recommended for Development)

1.  **Install and Start Nillion Devnet**:
    ```bash
    nilup install latest
    nilup use latest
    nilup instrumentation enable --wallet <your-eth-wallet-address>
    
    # Run devnet with a consistent seed
    nillion-devnet --seed my-seed
    ```

2.  **Configure Environment Variables**:
    -   The `nillion-devnet` command will output an environment file path (e.g., `nillion-devnet.env`).
    -   Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
        ```
    -   Open `.env` and fill in the values from the `nillion-devnet` output:
        -   `REACT_APP_NILLION_CLUSTER_ID`
        -   `REACT_APP_NILLION_BOOTNODE_WEBSOCKET`
        -   `REACT_APP_NILLION_NILCHAIN_JSON_RPC`
        -   `REACT_APP_NILLION_NILCHAIN_PRIVATE_KEY`

### Option B: Nillion Testnet

Refer to the [Nillion Testnet Configuration Guide](https://docs.nillion.com/network-configuration) for the appropriate environment variables.

## 🏃‍♂️ Running the Application

Start the development server:

```bash
npm start
```

-   The application will open at **[http://localhost:8080](http://localhost:8080)**.
-   The **Blind Inference Demo** is located at **[http://localhost:8080/blind-inference](http://localhost:8080/blind-inference)**.

## 🧪 How to Use

### Blind Inference Demo
1.  Navigate to the **Blind Inference** page.
2.  **Connect**: Click "Generate User Key" to create a temporary identity for the session.
3.  **Input Data**: Enter the housing features (Area, Bedrooms, etc.). Your data remains private.
4.  **Compute**: detailed computations happen on the Nillion network. The result (predicted price) is returned to you without the network ever seeing your specific inputs.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
