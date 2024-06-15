#!/usr/bin/env python
# coding: utf-8

import json
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import matplotlib.pyplot as plt
import numpy as np
from keras.models import load_model
import keras.utils as image_utils
import sys
import os

try:
    if not tf.config.list_physical_devices('GPU'):
        os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
        
    # Load the labels from the JSON file
    with open("../frontend/public/labels.json", "r") as file:
        ttf = json.load(file)
    
    # Load the pre-trained model
    model = tf.keras.models.load_model('../frontend/public/classifier96.h5')

    # Specify the dimensions of the input images
    img_width, img_height = 224, 224

    # Load and preprocess image
    if len(sys.argv) != 2:
        raise ValueError("Usage: python script_name.py [image_url]")
    
    IMAGE_PATH = sys.argv[1]
    # Load and preprocess the image
    img = image.load_img(IMAGE_PATH, target_size=(img_width, img_height))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)

    # Make a prediction
    predictions = model.predict(x)
    

    # Assuming the model outputs probabilities for each class, find the class with the highest probability
    class_index = np.argmax(predictions[0])

    #Finding accuracy of testing
    accuracy=np.max(predictions)*100
    
    # Find the predicted class label using the loaded labels dictionary
    predicted_class = None
    for label, index in ttf.items():
        if index == class_index:
            predicted_class = label
            break

    #JSON response
    result = {
        "success": True,
        "SpeciesName": predicted_class,  
        "accuracy": round(accuracy,2)
    }

    print(json.dumps(result))
    
except Exception as e:
    print("Error", e)