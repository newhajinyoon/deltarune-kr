import re

index_file = 'index.htm'
translated_file = 'translated.txt'

# 1. index.htm 읽어서 텍스트가 있는 줄 + title 속성 줄만 뽑아서 저장 (줄번호:내용)
def extract_lines_for_translation():
    with open(index_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    trans_lines = {}
    title_pattern = re.compile(r'title="([^"]*)"')

    for i, line in enumerate(lines):
        stripped = line.strip()

        # 1) title 속성 있는 줄
        if 'title="' in line:
            trans_lines[i] = line

        else:
            # 2) 태그 안 텍스트가 포함된 줄 (HTML 태그는 있지만 텍스트가 있으면)
            # 아주 간단하게, <태그>텍스트</태그> 형태 확인
            m = re.search(r'>([^<>\s][^<>]*?)<', line)
            if m:
                trans_lines[i] = line

    # 저장 (줄번호:줄) 형태로 텍스트만 뽑아서 저장
    with open(translated_file, 'w', encoding='utf-8') as f:
        for lineno in sorted(trans_lines.keys()):
            # 저장 포맷: 줄번호 TAB 내용 (줄 내용 그대로)
            f.write(f"{lineno}\t{trans_lines[lineno]}")

    print(f"'{translated_file}'에 {len(trans_lines)}개 텍스트 라인 저장 완료.")

# 2. translated.txt 읽어서 줄번호 기준으로 index.htm 줄을 교체
def apply_translated_lines():
    with open(index_file, 'r', encoding='utf-8') as f:
        orig_lines = f.readlines()

    translated_lines = {}
    with open(translated_file, 'r', encoding='utf-8') as f:
        for line in f:
            if not line.strip():
                continue
            parts = line.split('\t', 1)
            if len(parts) != 2:
                continue
            lineno, text = parts
            lineno = int(lineno)
            translated_lines[lineno] = text

    # 줄 단위 교체
    for lineno, new_line in translated_lines.items():
        orig_lines[lineno] = new_line

    # 저장
    with open(index_file, 'w', encoding='utf-8') as f:
        f.writelines(orig_lines)

    print(f"'{index_file}' 파일이 수정되었습니다.")

def main():
    extract_lines_for_translation()
    print("translated.txt 파일을 수정한 후 저장하세요. 완료하면 아무 키나 누르세요.")
    input()
    apply_translated_lines()

if __name__ == '__main__':
    main()
