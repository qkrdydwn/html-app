#!/usr/bin/env python3
"""Garmin Connect API Demo by cyberjunky"""

import os
import sys
import time
import logging
from datetime import datetime, timedelta
from garminconnect import (
    GarminConnect,
    GarminConnectConnectionError,
    GarminConnectTooManyRequestsError,
    GarminConnectAuthenticationError,
)

# Configure debug logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def init_api():
    """Initialize Garmin API with your credentials"""
    try:
        # Remember to replace email and password with your Garmin Connect credentials!
        api = GarminConnect()
        api.login('qkrdydwn20234113@gmail.com', 'Qkrdydwn1!')
        return api
    except GarminConnectConnectionError as err:
        logger.error("Error connecting to Garmin Connect: %s", err)
        return None
    except GarminConnectAuthenticationError as err:
        logger.error("Authentication error: %s", err)
        return None
    except Exception as err:
        logger.error("Something went wrong: %s", err)
        return None

def get_heart_rate_data(api):
    """Get heart rate data"""
    try:
        # Get heart rate data for today
        heart_rate_data = api.get_heart_rates(datetime.now().strftime("%Y-%m-%d"))
        print("Heart rate data:", heart_rate_data)
        return heart_rate_data
    except Exception as err:
        logger.error("Error getting heart rate data: %s", err)
        return None

def main():
    """Main function"""
    api = init_api()
    if api:
        try:
            # Get heart rate data
            heart_rate_data = get_heart_rate_data(api)
            if heart_rate_data:
                print("Successfully retrieved heart rate data")
            
        except Exception as err:
            logger.error("Something went wrong: %s", err)
        finally:
            api.disconnect()

if __name__ == "__main__":
    main() 