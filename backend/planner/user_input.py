def get_user_input():
    wake_time = input("Enter your wake-up time (HH:MM, 24-hour format, e.g., 07:00): ")
    sleep_time = input("Enter your sleep time (HH:MM, 24-hour format, e.g., 23:00): ")

    work_hours = []
    start_work = input("Enter your work/study start time (HH:MM): ")
    end_work = input("Enter your work/study end time (HH:MM): ")
    work_hours.append((start_work, end_work))

    stress_level = input("Enter your stress level (Low/Medium/High): ")

    tasks = []
    print("\nEnter your tasks. Type 'done' when finished.")
    while True:
        task_name = input("Task name: ")
        if task_name.lower() == 'done':
            break
        task_type = input("Task type (Deep Work / Light Work / Creative / High-Stakes Decision): ")
        tasks.append({"name": task_name, "type": task_type})

    return {
        "wake_time": wake_time,
        "sleep_time": sleep_time,
        "work_hours": work_hours,
        "stress_level": stress_level,
        "tasks": tasks
    }
