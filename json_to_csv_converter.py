import json
import csv

filename = "yelp_academic_dataset_user"

data = [json.loads(line)
        for line in open(filename+'.json', 'r', encoding='utf-8')]
employee_data = data

data_file = open(filename+'.csv', 'w', encoding="utf-8")

csv_writer = csv.writer(data_file)

count = 0

for emp in employee_data:
    if count == 0:
        header = emp.keys()
        csv_writer.writerow(header)
        count += 1
    csv_writer.writerow(emp.values())

data_file.close()
