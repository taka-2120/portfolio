interface ExperienceProps {
  name: string;
  role: string;
  start: Date;
  end?: Date | null;
}

class Experience {
  name: string;
  role: string;
  start: Date;
  end: Date | null;

  constructor({ name, role, start, end = null }: ExperienceProps) {
    this.name = name;
    this.role = role;
    this.start = start;
    this.end = end;
  }
}

export default Experience;
