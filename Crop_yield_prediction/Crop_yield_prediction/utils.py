import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import matplotlib.pyplot as plt
import seaborn as sns

def load_data(file_path):
    """Load the dataset"""
    return pd.read_csv(file_path)

def get_dataset_overview(df):
    """Generate dataset overview statistics"""
    overview = {
        'total_records': len(df),
        'total_features': len(df.columns),
        'numeric_features': len(df.select_dtypes(include=[np.number]).columns),
        'categorical_features': len(df.select_dtypes(include=['object']).columns),
        'missing_values': df.isnull().sum().sum(),
        'duplicate_rows': df.duplicated().sum()
    }
    return overview

def create_correlation_heatmap(df):
    """Create a correlation heatmap for numeric features"""
    numeric_df = df.select_dtypes(include=[np.number])
    correlation_matrix = numeric_df.corr()
    
    fig = px.imshow(
        correlation_matrix,
        title="Correlation Heatmap",
        aspect="auto",
        color_continuous_scale="RdBu_r",
        zmin=-1,
        zmax=1
    )
    
    return fig

def create_feature_importance_plot(feature_importances, feature_names):
    """Create a feature importance plot"""
    # Sort features by importance
    indices = np.argsort(feature_importances)[::-1]
    sorted_features = [feature_names[i] for i in indices]
    sorted_importances = feature_importances[indices]
    
    # Create plot
    fig = px.bar(
        x=sorted_importances,
        y=sorted_features,
        orientation='h',
        title='Feature Importance',
        labels={'x': 'Importance', 'y': 'Features'}
    )
    
    return fig

def create_yield_distribution_plot(df):
    """Create a distribution plot for yield"""
    fig = px.histogram(
        df, 
        x='yield_kg_per_hectare',
        title='Distribution of Crop Yield',
        labels={'yield_kg_per_hectare': 'Yield (kg/hectare)'}
    )
    
    return fig

def create_yield_by_crop_plot(df):
    """Create a box plot of yield by crop type"""
    fig = px.box(
        df,
        x='crop_type',
        y='yield_kg_per_hectare',
        title='Yield Distribution by Crop Type',
        labels={'crop_type': 'Crop Type', 'yield_kg_per_hectare': 'Yield (kg/hectare)'}
    )
    
    return fig

def create_yield_by_region_plot(df):
    """Create a bar plot of average yield by region"""
    region_yield = df.groupby('region')['yield_kg_per_hectare'].mean().reset_index()
    region_yield = region_yield.sort_values('yield_kg_per_hectare', ascending=False)
    
    fig = px.bar(
        region_yield,
        x='region',
        y='yield_kg_per_hectare',
        title='Average Yield by Region',
        labels={'region': 'Region', 'yield_kg_per_hectare': 'Average Yield (kg/hectare)'}
    )
    
    return fig