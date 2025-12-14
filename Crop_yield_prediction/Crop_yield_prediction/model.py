import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import warnings
warnings.filterwarnings('ignore')

class CropYieldPredictor:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.label_encoders = {}
        
    def load_data(self, file_path):
        """Load and preprocess the dataset"""
        df = pd.read_csv(file_path)
        
        # Convert date columns to datetime
        df['sowing_date'] = pd.to_datetime(df['sowing_date'])
        df['harvest_date'] = pd.to_datetime(df['harvest_date'])
        
        # Extract month from dates
        df['sowing_month'] = df['sowing_date'].dt.month
        df['harvest_month'] = df['harvest_date'].dt.month
        
        # Drop original date columns and other non-numeric columns
        df = df.drop(['farm_id', 'sowing_date', 'harvest_date', 'timestamp', 'sensor_id'], axis=1)
        
        # Handle categorical columns
        categorical_cols = ['region', 'crop_type', 'irrigation_type', 'fertilizer_type', 
                           'crop_disease_status', 'planting_season']
        
        for col in categorical_cols:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col].astype(str))
            self.label_encoders[col] = le
        
        # Separate features and target
        self.X = df.drop('yield_kg_per_hectare', axis=1)
        self.y = df['yield_kg_per_hectare']
        
        return df
    
    def train_model(self):
        """Train the Random Forest model"""
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(
            self.X, self.y, test_size=0.2, random_state=42
        )
        
        # Scale the features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train the model
        self.model.fit(X_train_scaled, y_train)
        
        # Make predictions
        y_pred = self.model.predict(X_test_scaled)
        
        # Calculate metrics
        mae = mean_absolute_error(y_test, y_pred)
        mse = mean_squared_error(y_test, y_pred)
        rmse = np.sqrt(mse)
        r2 = r2_score(y_test, y_pred)
        
        metrics = {
            'MAE': mae,
            'MSE': mse,
            'RMSE': rmse,
            'R2': r2
        }
        
        return metrics, X_test, y_test, y_pred
    
    def predict_yield(self, input_data):
        """Predict yield for new input data"""
        # Preprocess the input data
        input_df = pd.DataFrame([input_data])
        
        # Encode categorical variables
        for col, le in self.label_encoders.items():
            if col in input_df.columns:
                input_df[col] = le.transform([input_df[col].iloc[0]])[0]
        
        # Scale the features
        input_scaled = self.scaler.transform(input_df)
        
        # Make prediction
        prediction = self.model.predict(input_scaled)[0]
        
        return prediction
    
    def save_model(self, file_path):
        """Save the trained model and preprocessing objects"""
        joblib.dump({
            'model': self.model,
            'scaler': self.scaler,
            'label_encoders': self.label_encoders
        }, file_path)
    
    def load_saved_model(self, file_path):
        """Load a saved model"""
        saved_data = joblib.load(file_path)
        self.model = saved_data['model']
        self.scaler = saved_data['scaler']
        self.label_encoders = saved_data['label_encoders']
        return True

# Example usage
if __name__ == "__main__":
    # Initialize the predictor
    predictor = CropYieldPredictor()
    
    # Load and preprocess data
    df = predictor.load_data('Odisha_Crop_Yield_Dataset.csv')
    
    # Train the model
    metrics, X_test, y_test, y_pred = predictor.train_model()
    
    print("Model Performance Metrics:")
    for metric, value in metrics.items():
        print(f"{metric}: {value:.4f}")
    
    # Save the model
    predictor.save_model('crop_yield_model.pkl')
    print("Model saved successfully!")