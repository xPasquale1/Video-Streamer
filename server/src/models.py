from dataclasses import dataclass, asdict


@dataclass
class MovieData:
    id: str
    title: str
    thumbnail_ext: str
    video_ext: str

    def to_dict(self):
        return asdict(self)
