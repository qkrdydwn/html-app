from garminconnect import GarminConnect

def main():
    try:
        # Garmin Connect API 클라이언트 초기화
        api = GarminConnect()
        
        # 로그인
        api.login('qkrdydwn20234113@gmail.com', 'Qkrdydwn1!')
        
        # 오늘 날짜의 심박수 데이터 가져오기
        heart_rate_data = api.get_heart_rates('2024-03-20')
        print("심박수 데이터:", heart_rate_data)
        
        # 오늘 날짜의 활동 데이터 가져오기
        activity_data = api.get_last_activity()
        print("활동 데이터:", activity_data)
        
        # 연결 종료
        api.disconnect()
        
    except Exception as e:
        print("에러 발생:", str(e))

if __name__ == "__main__":
    main() 