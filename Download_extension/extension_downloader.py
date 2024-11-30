import csv
import os

import requests

# API 기본 URL 설정
BASE_URL = "https://chrome-stats.com/api"

# API 키 설정
API_KEY = "a72ca3c4-c2c8-4618-8302-5d9b8ae364e7"

# 요청 헤더 설정
HEADERS = {
    "x-api-key": API_KEY
}

# 다운로드 폴더 설정
DOWNLOAD_FOLDER = "/Users/minhyuk/Desktop/Download_extension/extensions"
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

# CSV 파일 경로 설정
CSV_FILE_PATH = "/Users/minhyuk/Desktop/csf/test/Download_extension/sample_datasets/recently-updated-extensions_2024_recently-updated-extensions-20241122_example.csv"

def get_available_versions(extension_id):
    """
    /api/list-versions 엔드포인트를 호출해 확장 프로그램의 사용 가능한 버전 목록을 가져옴.
    """
    url = f"{BASE_URL}/list-versions"
    params = {"id": extension_id}
    print(f"Requesting URL: {url}, Params: {params}")  # 요청 URL 출력
    response = requests.get(url, headers=HEADERS, params=params)
    print(f"Response: {response.status_code}, Content: {response.text}")
    if response.status_code == 200:
        data = response.json()
        return data.get("downloads", {}).get("allVersions", [])  # allVersions 리스트 추출
    else:
        print(f"Failed to get versions for {extension_id}: {response.status_code}, Response: {response.text}")
        return None


def download_extension(extension_id, version, file_type="CRX"):
    """
    /api/download 엔드포인트를 호출해 확장 프로그램을 다운로드.
    """
    url = f"{BASE_URL}/download"
    params = {"id": extension_id, "version": version, "type": file_type}
    print(f"Requesting URL: {url}, Params: {params}")  # 요청 URL 출력
    response = requests.get(url, headers=HEADERS, params=params, stream=True)  # 헤더 포함
    if response.status_code == 200:
        file_path = os.path.join(DOWNLOAD_FOLDER, f"{extension_id}_{version}.{file_type.lower()}")
        with open(file_path, "wb") as file:
            for chunk in response.iter_content(chunk_size=1024):
                file.write(chunk)
        print(f"Downloaded: {file_path}")
    else:
        print(f"Failed to download {extension_id} version {version}: {response.status_code}, Response: {response.text}")

def main():
    # CSV 파일 읽기
    with open(CSV_FILE_PATH, "r") as file:
        reader = csv.reader(file)
        next(reader)  # 헤더 스킵
        
        for row in reader:
            extension_id = row[0].strip()  # ID에서 공백 제거
            if not extension_id:  # 빈 값 처리
                # print("Empty extension ID, skipping...")
                continue
            print(f"Processing extension ID: {extension_id}")
            
            # 사용 가능한 버전 가져오기
            versions = get_available_versions(extension_id)
            if versions:
                # 가장 최신 버전 선택
                latest_version_info = versions[0]  # 가장 마지막 버전 사용
                latest_version = latest_version_info["version"]
                print(f"Latest version for {extension_id}: {latest_version}")
                
                # 확장 프로그램 다운로드
                download_extension(extension_id, latest_version, file_type="CRX")
            break
if __name__ == "__main__":
    main()